StacksightMeteor = {
    stacksightExtendFSInsert: function(Collections) {
        _.each(Collections, function(Collection) {
            var insert_func = Collection.insert;
            Collection.insert = function(file, callback) {
                var insert_callback = function(err, fileout) {
                    if(err !== undefined) {
                        //    Error callback
                    } else {
                        var dataobj = {
                            id: fileout._id,
                            url: Meteor.absoluteUrl(fileout.url({brokenIsFine: true})),
                            name: fileout.data.blob.name,
                            size: fileout.data.blob.size,
                            type: fileout.data.blob.type,
                        };
                        if(fileout.isImage() === true) {
                            dataobj = _.extend(dataobj, {
                                filetype: {subtype: 'image'}
                            });
                        }
                        Meteor.call('hookImageLoad', dataobj);
                    }
                    callback.call(Collection, err, fileout);
                }
                insert_func.call(Collection, file, insert_callback);
            }
        });
    }
};