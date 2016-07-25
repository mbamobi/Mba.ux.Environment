Ext.define('Mba.ux.Environment.overrides.Connection', {
    override: 'Ext.data.Connection',
    requires: [ 'Mba.ux.Environment.config.Url' ],

    setupHeaders: function(xhr, options, data, params) 
    {
        headers = this.callOverridden(arguments);    
        if (!headers['Origin']) {
            headers['Origin'] = location.protocol + '//' + location.hostname;
        }    
        return headers;
    },
    
    setupUrl: function(options, url)
    {
        var form = this.getForm(options);
        if (form) {
            url = url || form.action;
        }

        if (!Mba.ux.Environment.config.Url.has(url)) {
            return this.replaceParamsUrl(options, url);
        }

        url = Mba.ux.Environment.config.Url.get(url);

        return this.replaceParamsUrl(options, url);
    },

    replaceParamsUrl: function(options, url)
    {
        var regex, params;
        if (options.params) {

            if (typeof(options.params) === 'string'){
                params = Ext.JSON.decode(options.params);
            } else {
                params = options.params;
            }

            for (var i in params) {
                regex = new RegExp('\{' + i + '\}', 'i');
                url = url.replace(regex, params[i]);
            }
        }

        return url;
    }
});
