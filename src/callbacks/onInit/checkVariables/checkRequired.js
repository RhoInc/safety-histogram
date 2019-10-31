import { select } from 'd3';

export default function checkRequired() {
    this.variables.required = this.variables.definitions.filter(
        definition => definition.required === true
    );
    this.variables.required.forEach(definition => {
        if (this.variables.actual.indexOf(definition.setting) < 0) {
            definition.missing = true;

            // Define error text.
            const codeStyle = [
                'padding: 1px 5px',
                'white-space: prewrap',
                'font-family: Consolas,Lucida Console,Courier New,monospace,sans-serif',
                'background-color: #eff0f1'
            ];
            const errorText = `The variable specified for <code style='${codeStyle.join(';')}'>${
                definition.property
            }</code>, <em>${definition.setting}</em>, does not exist in the data.`;

            // Print error to console.
            console.error(errorText.replace(/<.+?>/g, ''));

            // Print error to containing element.
            const div = select(this.div);
            div.append('p')
                .html(errorText)
                .style('color', 'red');
        }
    });

    // Destroy chart.
    if (this.variables.required.some(definition => definition.missing)) this.destroy();
}
