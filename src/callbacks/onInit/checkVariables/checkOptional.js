export default function checkOptional() {
    this.variables.optional = this.variables.definitions.filter(
        definition => definition.required === false
    );

    this.variables.optional.forEach(definition => {
        if (definition.type === 'string') {
            if (this.variables.actual.indexOf(definition.setting) < 0) {
                definition.missing = true;
                console.warn(
                    `The variable specified for [ ${definition.property} ], ${
                        definition.setting
                    }, does not exist in the data.`
                );
            }
        } // standard data mappings
        else if (
            definition.type === 'array' &&
            Array.isArray(definition.setting) &&
            definition.setting.length
        ) {
            definition.setting.forEach((subDefinition, i) => {
                const variable = subDefinition.value_col || subDefinition;
                if (this.variables.actual.indexOf(variable) < 0) {
                    definition.missing = true;
                    console.warn(
                        `The variable specified for [ ${
                            definition.property
                        }[${i}] ], ${variable}, does not exist in the data.`
                    );
                }
            });
        } // optional variable arrays (filters, listing columns)

        //Remove participant ID column from listing if variable is missing.
        if (definition.property === 'id_col' && definition.missing) {
            const index = this.listing.config.cols.findIndex(col => col === definition.setting);
            this.listing.config.cols.splice(index, 1);
            this.listing.config.headers.splice(index, 1);
        }
    });
}
