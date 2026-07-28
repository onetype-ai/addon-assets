// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

const assets = onetype.Addon('assets', (addon) =>
{
    addon.Description('One script and one stylesheet for the whole instance, built from every folder and snippet registered here, in order.');

    addon.Field('id', {
        type: 'number',
        description: 'The number this entry answers to, given as it is registered.'
    });

    addon.Field('order', {
        type: 'number',
        description: 'Where it falls in the build, lower goes in first.'
    });

    addon.Field('path', {
        type: 'string',
        description: 'The folder to read, every file of the matching type below it joins the build.'
    });

    addon.Field('content', {
        type: 'string|function',
        description: 'Source written out instead of read from a folder, a function is called with the request context.'
    });

    addon.Field('type', {
        type: 'string',
        description: 'Which build it joins, js or css.'
    });

    addon.Field('ignore', {
        type: 'array',
        value: [],
        description: 'Path fragments to skip while reading the folder.',
        each: {
            type: 'string',
            description: 'One fragment, a file whose path carries it is left out.'
        }
    });

    addon.Field('condition', {
        type: 'function',
        description: 'Called with the request context, answering false leaves this entry out of that build.'
    });
});

export default assets;
