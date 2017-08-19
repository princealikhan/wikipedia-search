    var pageBaseUri = 'https://en.wikipedia.org/?curid=';

    $('.ui.search')
        .search({
            type: 'category',
            minCharacters: 3,
            apiSettings: {
                onResponse: function(responseData) {

                    if(responseData.hasOwnProperty('query')) {
                    
                        responseData = responseData.query.pages;

                        var response = {
                            results: {}
                        };

                        $.each(responseData, function(index, item) {

                            if (response.results[item.pageid] === undefined) {
                                response.results[item.pageid] = {
                                    name: item.title,
                                    results: []
                                };
                            }
                            var imageUri = 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png';
                            if(item.hasOwnProperty('thumbnail')){
                                imageUri = item.thumbnail.source;
                            }
                            // // add result
                            response.results[item.pageid].results.push({
                                title: item.title,
                                description: item.extract,
                                url: pageBaseUri + index,
                                image: imageUri
                            });
                        });

                        return response;

                    }else{
                        return [];
                    }
                },
                url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&generator=search&gsrlimit=1&prop=pageimages|extracts&pilimit=max&exsentences=1&exlimit=10&gsrsearch={query}'
            }
    });
