const fs = require("fs");
const { Command } = require("commander");
const PNG = require("pngjs").PNG;

const command = new Command();

const ocean_tile = new PNG({ width: 256, height: 256 });

for (let y = 0; y < ocean_tile.height; y++) {
    for (let x = 0; x < ocean_tile.width; x++) {
        let idx = (ocean_tile.width * y + x) << 2;

        ocean_tile.data[idx] = 0;
        ocean_tile.data[idx + 1] = 0x1d;
        ocean_tile.data[idx + 2] = 0x28;
        ocean_tile.data[idx + 3] = 0xff;
    }
}

const space_tile = new PNG({ width: 256, height: 256 });

for (let y = 0; y < space_tile.height; y++) {
    for (let x = 0; x < space_tile.width; x++) {
        let idx = (space_tile.width * y + x) << 2;

        space_tile.data[idx] = 0x00;
        space_tile.data[idx + 1] = 0x00;
        space_tile.data[idx + 2] = 0x00;
        space_tile.data[idx + 3] = 0xff;
    }
}

const write_bg_png = (path, png) => {
    const buff = PNG.sync.write(png);
    fs.writeFileSync(path, buff);
};

const create_azeroth = (png_dir, out_dir) => {
    // create 128x128 grid containing Kalimdor, Northrend and 'Azeroth' aka Eastern Kingdoms and center it on 0, so the left edge of kalimdor will be x=-64 and right edge of eastern will be x=64
    ["Azeroth", "Kalimdor", "Northrend"].forEach((c) => {
        const pngs = fs.readdirSync(png_dir + "/" + c);
        pngs.forEach((png) => {
            const coord = png.match(/([0-9]+)_([0-9]+).png/);
            if (!coord) throw new Error(`failed to parse coords from ${png}`);
            let x = coord[1];
            let y = coord[2];
            if (c === "Kalimdor") {
                x = x - 64;
            } else if (c === "Northrend") {
                x = x - 32;
                y = y - 26; // magic number to make the map line up like in game
            } else if (c === "Azeroth") {
                y = y - 7; // magic number to make the map line up like in game
            }
            fs.mkdirSync(out_dir + "/Azeroth/0/" + x + "/", {
                recursive: true,
            });
            fs.copyFileSync(
                png_dir + "/" + c + "/" + png,
                out_dir + "/Azeroth/0/" + x + "/" + y + ".png"
            );
        });
    });
    const x_dirs = fs.readdirSync(out_dir + "/Azeroth/0/");
    // file in missing tiles with ocean tile
    for (let i = -64; i <= 64; i++) {
        if (!x_dirs.includes(i))
            fs.mkdirSync(out_dir + "/Azeroth/0/" + i, { recursive: true });
        const pngs = fs.readdirSync(out_dir + "/Azeroth/0/" + i);
        for (let j = -64; j <= 64; j++) {
            if (!pngs.includes(j + ".png"))
                write_bg_png(
                    out_dir + "/Azeroth/0/" + i + "/" + j + ".png",
                    ocean_tile
                );
        }
    }
};

const create_outland = (png_dir, out_dir) => {
    const pngs = fs.readdirSync(png_dir + "/Expansion01");
    pngs.forEach((png) => {
        const coord = png.match(/([0-9]+)_([0-9]+).png/);
        if (!coord) throw new Error(`failed to parse coords from ${png}`);
        let x = coord[1] - 32;
        let y = coord[2] - 32;
        fs.mkdirSync(out_dir + "/Outland/0/" + x + "/", {
            recursive: true,
        });
        fs.copyFileSync(
            png_dir + "/Expansion01/" + png,
            out_dir + "/Outland/0/" + x + "/" + y + ".png"
        );
    });
    const x_dirs = fs.readdirSync(out_dir + "/Outland/0/");
    // file in missing tiles with ocean tile
    for (let i = -32; i <= 32; i++) {
        if (!x_dirs.includes(i))
            fs.mkdirSync(out_dir + "/Outland/0/" + i, { recursive: true });
        const pngs = fs.readdirSync(out_dir + "/Outland/0/" + i);
        for (let j = -32; j <= 32; j++) {
            if (!pngs.includes(j + ".png"))
                write_bg_png(
                    out_dir + "/Outland/0/" + i + "/" + j + ".png",
                    space_tile
                );
        }
    }
};

const create_map = (png_dir, out_dir, { map }) => {
    console.log(
        `Creating map dir with png_dir=${png_dir}, out_dir=${out_dir}, map=${map}`
    );

    if (["all", "outland"].includes(map)) create_outland(png_dir, out_dir);
    if (["all", "azeroth"].includes(map)) create_azeroth(png_dir, out_dir);
};

command
    .name("create-map-dir-layout")
    .argument("<png-dir>")
    .argument("<out-dir>")
    .requiredOption("--map <name>", "'azeroth' or 'outland'", (v) => {
        if (["azeroth", "outland", "all"].includes(v.toLowerCase())) {
            return v;
        } else {
            command.error("'--map' must be 'azeroth', 'outland' or 'all'");
        }
    })
    .action(create_map);

command.parse();
