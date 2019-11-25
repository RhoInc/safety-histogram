import clone from '../../../util/clone';

export default function defineSettings() {
    const settings = clone(this.settings);

    // x-axis
    settings.x = Object.assign({}, this.config.x);
    settings.x.label = '';

    // y-axis
    settings.y = Object.assign({}, this.config.y);
    settings.y.label = '';

    return settings;
}
