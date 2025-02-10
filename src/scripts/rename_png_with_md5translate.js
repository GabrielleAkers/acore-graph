const fs = require("fs");
const readline = require("readline");
const { Command } = require("commander");

const command = new Command();

const rename_pngs = (pngdir, md5translate_file, outdir) => {
    let out_dir = outdir;
    let png_dir = pngdir
    if (!out_dir.endsWith("/")) out_dir = out_dir + "/";
    if (!png_dir.endsWith("/")) png_dir = png_dir + "/";

    const md5_input_stream = fs.createReadStream(md5translate_file);
    const md5_linereader = readline.createInterface({
        input: md5_input_stream,
        terminal: false,
    });
    const trs_blocks = {}
    let current_block = "";
    md5_linereader.on("line", line => {
        const l = String.raw`${line}`;
        if (l.startsWith("dir: WMO"))
            return;
        if (l.startsWith("dir:")) {
            current_block = l.match(/dir: (.*)/)[1];
            trs_blocks[current_block] = [];
        } else {
            const m = l.match(/\\(map[0-9_]+.blp)\t([aA-zZ0-9]+.blp)/);
            if (!m) return;
            trs_blocks[current_block].push({
                map_file: m[1],
                texture_file: m[2]
            });
        }
    });
    md5_linereader.on("close", () => {
        const png_files = fs.readdirSync(png_dir);
        Object.entries(trs_blocks).forEach(kv => {
            const area = kv[0];
            const block = kv[1];
            block.forEach(b => {
                const base_tex_name = b.texture_file.replace(".blp", "");
                const coord = b.map_file.match(/map([0-9]+_[0-9]+).*/);
                if (!coord) return;
                const png_file = png_files.find(v => v === base_tex_name + ".png");
                if (png_file) {
                    console.log("renaming", base_tex_name + ".png", "to", area + "/" + coord[1] + ".png");
                    fs.mkdirSync(out_dir + area, {recursive: true});
                    fs.rename(
                        png_dir + png_file,
                        out_dir + area + "/" + coord[1] + ".png",
                        err => {} // some files dont exist? we just skip them
                    );
                }
            })
        })
    })
}

command.name("rename-png-with-md5-translate")
  .argument('<png-dir>')
  .argument('<md5translate-file>')
  .argument('<outdir>')
  .action(rename_pngs);


command.parse();
