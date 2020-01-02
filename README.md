# Tiqav2
Tiqav2 is the platform that provide Searching Image API.
(inspired from [tiqav](http://dev.tiqav.com/))

# Setup
Use the some services.
1. [algolia](https://www.algolia.com/)
2. [cloudinary](https://cloudinary.com/)
3. [google cloud vision api](https://cloud.google.com/vision/)

## 1. algolia
> Algolia is that create delightful Search and Discovery experiences.

1. Login to [algolia](https://www.algolia.com)
2. Create the application in [account/application](https://www.algolia.com/account/applications)
3. Create the Index(name:prod_images) in dashboard (https://www.algolia.com/apps/XXXX/dashboard, XXXX: 1's App ID)

Need the below.

* App ID <ALGOLIA_APP_ID>
* Admin Key <ALGOLIA_ADMIN_KEY>

## 2. cloudinary
> Streamline media management and improve user experience by automatically delivering images and videos, enhanced and optimized for every user.

1. Login to [cloudinary](https://cloudinary.com/)
2. Access to [console](https://cloudinary.com/console)

Need the below.

* Cloud name <CLOUDINARY_CLOUD_NAME>
* API Key <CLOUDINARY_API_KEY>
* API Secret <CLOUDINARY_API_SECRET>

## 3. google cloud vision api
> Derive insights from your images in the cloud or at the edge with AutoML Vision or use pre-trained Vision API models to detect emotion, understand text, and more.

You should look at [quickstart](https://cloud.google.com/vision/docs/quickstart)

# Which host will you use?

It's the [google cloud run](https://cloud.google.com/run/).
> Cloud Run is a managed compute platform that automatically scales your stateless containers.

You should look at [quickstart](https://cloud.google.com/run/docs/quickstarts/build-and-deploy)

Application enviroment
```bash
CLOUDINARY_CLOUD_NAME=<CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<CLOUDINARY_API_SECRET>
ALGOLIA_APP_ID=<ALGOLIA_APP_ID>
ALGOLIA_ADMIN_KEY=<ALGOLIA_ADMIN_KEY>
ALGOLIA_INDEX_NAME=prod_images

# For local debug
# GOOGLE_APPLICATION_CREDENTIALS=./credentials/XXXX.json 
```

# Usage

```bash
# search
/api/search/newest.json
/api/search/random.json
/api/search.json?q=[keyword]&tags=[a,b,etc]

# image
# si is "Save Image (to cloudinary)"
/api/images.json?url=[url]&si=1
/api/[id].json
/api/[id].[ext]

# tag
/api/images/:id/tags.json
/api/tags.json
```
