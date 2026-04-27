import json

def create_json(filename, outputfile):
    dict = {}

    with open(filename, "r", encoding="utf-8") as fh:
        for line in fh:
            dict[line.split()[0][:-3]] = line.split()[1]

    output = open(outputfile, "w", encoding="utf8")
    json.dump(dict, output, indent = 4, sort_keys = False)
    output.close()

create_json("nc_frequencies.txt", "nc_frequencies.json")
create_json("ag_frequencies.txt", "ag_frequencies.json")
create_json("vm_frequencies.txt", "vm_frequencies.json")
