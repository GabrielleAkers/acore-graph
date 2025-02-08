const fs = require("fs");
const { Command } = require("commander");

const command = new Command();

const fix_load_csv_command = (target_file) => {
    let f = fs.readFileSync(target_file, "utf-8");

    if (!f) throw new Error("Couldnt open target file " + target_file);

    const p1 = /(CREATE CONSTRAINT) ON (.*) ASSERT (.*)/gm;
    f = f.replace(p1, "$1 FOR $2 REQUIRE $3");

    const p2 = /USING PERIODIC COMMIT\n(.*\n.*\n.*);/gm;
    f = f.replace(p2, "CALL {\n$1\n} IN TRANSACTIONS ON ERROR CONTINUE");

    const p3 = /USING PERIODIC COMMIT\n([aA-zZ0-9-\(\)\{\},. \n>':\/]*)/gm;
    f = f.replace(p3, "CALL {\n$1\n} IN TRANSACTIONS ON ERROR CONTINUE");

    const p4 = /CALL .*\n.*locale.*\n[aA-zZ \n\(\)0-9:\{\}.,>=]* IN TRANSACTIONS ON ERROR CONTINUE/gm;
    f = f.replace(p4, "");

    fs.writeFileSync("test_out.cypher", f);
}

command.name("fix-load-csv")
  .argument('<target-file>')
  .action(fix_load_csv_command);


command.parse();
