#!/usr/bin/env node

import { filePathValidator, sanitise } from "./validators/validations";
import { program } from "@caporal/core";
import { readFromScreen } from "./readers";
import { LoadFileInMemory } from "./processors";



program
    .argument("<file>", "Text file, that needs to be processed", {
        validator: (value) => {
            if (value) {
                try {
                    filePathValidator(value.toString());
                } catch (error) {
                    setTimeout(() => process.exit(), 500);
                    throw error;
                }
            }
            return value;
        }
    },)
    .argument("<inmemory>", "Load in memory", {
        validator: /^true|false/, 
        default: false
    })
    .action(({ logger, args }) => {
        const file = args.file.toString()
        logger.info("Reading: %s!", file);
        if (args.inmemory) {
            try {
                const buffer = LoadFileInMemory(file)
                readFromScreen("input search term: ", file, buffer);
            } catch (error) {
                console.log(error);
                process.exit()
            }
        } else {
            readFromScreen("input search term: ", file)
        }
    });

program.run()

