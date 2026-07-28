// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import assets from '#assets/addon.js';

assets.Fn('get.build', function(type, context = {})
{
    this.wanted = (item) =>
    {
        if(item.Get('type') !== type)
        {
            return false;
        }

        const condition = item.Get('condition');

        if(!condition)
        {
            return true;
        }

        return condition.call(context) !== false;
    };

    this.written = (item) =>
    {
        const content = item.Get('content');

        return typeof content === 'function' ? content.call(context) : content;
    };

    this.read = (item) =>
    {
        const files = this.Fn('find.files', item.Get('path'), type, item.Get('ignore'));

        return this.Fn('get.read', files);
    };

    this.sourced = (item) =>
    {
        if(item.Get('content'))
        {
            return [this.written(item)];
        }

        return item.Get('path') ? this.read(item) : [];
    };

    const ordered = Object.values(this.Items())
        .filter((item) => this.wanted(item))
        .sort((first, second) => first.Get('order') - second.Get('order'));

    const source = ordered.flatMap((item) => this.sourced(item));

    return this.Fn('make.transform', source, type);
});
