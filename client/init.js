StacksightMeteor = {
    extendsFS: function(collections) {
        _.each(collections, function(collection) {
            var insert_func = collection.insert;
            collection.insert = function(file, callback) {
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
                            Meteor.call('hookImageLoad', dataobj);
                        } else {
                            Meteor.call('hookFileLoad', dataobj);
                        }
                    }
                    callback.call(collection, err, fileout);
                }
                insert_func.call(collection, file, insert_callback);
            }
        });
    }
};