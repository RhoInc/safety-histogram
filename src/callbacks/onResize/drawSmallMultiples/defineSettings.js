import clone from '../../../util/clone';

export default function defineSettings() {
    const settings = clone(this.settings);

    // x-axis
    settings.x = clone(this.config.x);
    settings.x.label = '';

    // y-axis
    settings.y = clone(this.config.y);
    settings.y.label = '';

    return settings;
}
