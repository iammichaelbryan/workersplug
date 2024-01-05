import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'
import axios from 'axios'
import { icons, images, COLORS, SIZES } from '../../constants'
import { ScreenHeaderBtn, NearbyJobCard, JobAbout } from '../../components'
import styles from '../../styles/search'
import { param } from 'expo-router'
const JobSearch = () => {
    const params = useSearchParams();
    const router = useRouter()

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([])

        try {
            console.log('Page:', page);
console.log('Query:', params.id);

      const options = {
                method: "GET",
                url: `https://jsearch.p.rapidapi.com/search`,
                headers: {
                    "X-RapidAPI-Key": 'c5bb3923c5mshbd3449c79fbcd1fp1554c2jsndadf20d29365',
                    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
                },
                params: {
                    query: params.id,
                    page: page.toString(),
                },
            };

            const response = await axios.request(options);
            setSearchResult(response.data.data);
            console.log(searchResult);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }
    };

    const handlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            handleSearch()
        } else if (direction === 'right') {
            setPage(page + 1)
            handleSearch()
        }
    }

    useEffect(() => {
        handleSearch()
    }, [page])


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
                <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl= {icons.left} dimension={40} handlePress={() => router.back()}/>
                        ),
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={images.profile} dimension={40} />
                        ),
                        headerTitle: "  Search Results",
                        headerTitleStyle: {
                            color: COLORS.primary,
                            fontWeight: "bold",
                            fontSize: SIZES.h3,
                            flex: 1,
                        },
                        
                    }}
                />

                <FlatList
                    data={searchResult}
                    renderItem={({ item }) => (
                        <NearbyJobCard
                            job={item}
                            handleNavigate={() => router.push(`/job-details/${item.job_id}`, { id: item.job_id })}                        />
                    )}
                    keyExtractor={(item) => item.job_id}
                    contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <>
                            <View style={styles.container}>
                                <Text style={styles.searchTitle}>{params.id}</Text>
                                <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                            </View>
                            <View style={styles.loaderContainer}>
                                {searchLoader ? (
                                    <ActivityIndicator size="large" color={COLORS.primary} />
                                    ) : searchError && (
                                        <Text style={styles.errorText}>An error occured</Text>
                                        )}
                            </View>        

                        </>
                    )}
                    ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('left')}
                        >
                            <Image
                                source={icons.chevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => handlePagination('right')}
                        >
                            <Image
                                source={icons.chevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        
                            </TouchableOpacity>
                        </View>
                    )}
                />
                </SafeAreaView>
        )
    }
    
    export default JobSearch
