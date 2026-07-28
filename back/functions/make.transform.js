// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import assets from '#assets/addon.js';

assets.Fn('make.transform', function(contents, type = 'js')
{
    this.bare = (source) =>
    {
        return source
            .replace(/^import\s+.*?;?\s*$/gm, '')
            .replace(/^export\s+.*?;?\s*$/gm, '')
            .replace(/^\s*[\r\n]/gm, '');
    };

    this.written = (source) =>
    {
        if(!source)
        {
            return false;
        }

        return Boolean(source.trim());
    };

    if (!Array.isArray(contents))
    {
        return '';
    }

    if (type === 'js')
    {
        const bared = contents.map((source) => this.bare(source)).filter((source) => this.written(source));

        return '(function(){\n' + bared.join('\n\n') + '\n})();';
    }

    return contents.filter((source) => this.written(source)).map((source) => source.trim()).join('\n');
});
