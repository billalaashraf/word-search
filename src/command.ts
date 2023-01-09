#!/usr/bin/env node

import { filePathValidator, sanitise } from "./validators/validations";
import { program } from "@caporal/core";
import { readFromScreen } from "./readers";



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
    .action(({ logger, args }) => {
        logger.info("Reading: %s!", args.file.toString());
        readFromScreen("input search term: ", args.file.toString())
    });

program.run()

