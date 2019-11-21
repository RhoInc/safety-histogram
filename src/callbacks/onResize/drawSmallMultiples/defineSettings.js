import clone from '../../../util/clone';

export default function defineSettings() {
    const settings = clone(this.settings);

    // x-axis
    settings.x = Object.assign({}, this.config.x);
    settings.x.label = '';

    // y-axis
    settings.y = Object.assign({}, this.config.y);
    settings.y.label = '';

    // dimensions
    settings.width = 425;
    settings.height = settings.width / 4;
    settings.resizable = false;
    settings.margin = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
    };

    return settings;
}
