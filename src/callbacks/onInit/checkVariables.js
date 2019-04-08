import { properties } from '../../../settings-schema.json';
import checkRequired from './checkVariables/checkRequired';
import checkOptional from './checkVariables/checkOptional';

export default function checkVariables() {
    this.variables = {
        actual: Object.keys(this.raw_data[0]),
        definitions: Object.keys(properties)
            .map(property => {
                const definition = properties[property];
                definition.property = property;
                definition.setting = this.config[property];
                return definition;
            })
            .filter(definition => definition['data-mapping'])
    };
    checkRequired.call(this);
    checkOptional.call(this);
}
