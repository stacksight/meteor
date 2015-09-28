#Stacksight

##Installation
```
meteor add udisun:stacksight
```

##How to use

#### User hooks
***

###### Required
~~~
1. "accounts-ui"
~~~

###### Init
~~~
User hooks don't need to manual init.
~~~

Hooks:
> 1. User login. Calling after user loged in.
> 2. User logout. Calling after user loged out.
> 3. User register. Calling after user registered.
> 4. User delete. Calling after user deleted.
> 5. User close session. Calling after user closed browser tab. ***Unactivated.***

#### File upload hooks
***

###### Required
~~~
1. "cfs:standard-packages"
2. "cfs:gridfs"
~~~

###### Init
```
// Init FS
var imageStore = new FS.Store.FileSystem("images", {path: "~/uploads"}); // Required cfs:filesystem package
var images = new FS.Collection("images", {
    stores: [imageStore]
});
// Extends FS
if(Meteor.isClient){
    StacksightMeteor.extendsFS([
        images
    ]);
}
```

Hooks:
> 1. Image upload. Calling after images uploaded.
> 2. File upload. Calling after files uploaded.

#### Collection hooks
***

###### Required
~~~
Nothing
~~~

###### Init
```
var articles = new Mongo.Collection("articles");
// Extends collections
if (Meteor.isServer) {
    StacksightMeteor.extendsCollections([
        {
            collection: articles, // Tracked collection
            type: 'article',      // Event type
            name: 'text'          // Field by event name
        }
    ]);
}
```

Hooks:
> 1. Document insert. Calling after document added to collection.
> 2. Document update. Calling after document updated to collection.
> 3. Document delete. Calling after document deleted from collection.
> 4. Document find one. Calling after "findOne()" query. ***Unactivated.***
> 5. Document find. Calling after "find()" query. ***Unactivated.***