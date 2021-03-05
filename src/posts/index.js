import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const POSTS_PATH = "wp-json/wp/v2/posts/"; 

const Posts = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]); 

    if(props.siteurl) {

        let siteurl = props.siteurl; 

        useEffect(() => {
            
            fetch(siteurl + POSTS_PATH, {

                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
    
            })
            .then((response) => response.json())
            .then((json) => { setData(json) })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

        }, []); 

        const PostsList = () => {

            let i; 

            for(i=0; i <= data.length; i++) {

                console.log(data[i].date);

                return(
                    <Text>{ data[i].title.rendered }</Text>
                )

            }

        }
 
        return ( 
            <View style={{ flex: 1, padding: 24 }}>
                <Text>{ data.length }</Text>
                {isLoading ? <ActivityIndicator/> : ( 
                    <PostsList />
                )}
            </View>
        );

    } else {

        return (
            <View>
                <Text>you must specify the website url</Text>
            </View>
        )

    }

    

}

export default Posts;