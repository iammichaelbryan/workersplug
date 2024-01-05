import React from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, ActivityIndicator,RefreshControl } from "react-native"; 
import { Stack, useRouter,useSearchParams} from "expo-router";
import { COLORS, icons, images, SIZES } from "../../constants";
import {useCallback,useState} from "react";
import {Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics, Welcome} from "../../components";
import useFetch from "../../hook/useFetch";
import { Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';



const JobDetails = () => {
    const tabs =[ 'About', 'Qualifications', 'Responsibilities'];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const params = useSearchParams();
    const router = useRouter();
    const displayTabContent = () => {
        switch (activeTab) {
            case 'Qualifications':
                return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A']} />;
                
            case 'About':
                return <JobAbout title="About" info= {data[0].job_description??  "No data provided"} />;
            case 'Responsibilities':
                return <Specifics title="Responsibilities" points={data[0].job_highlights?.Responsibilities
                 ?? ['N/A']} />;
            default:
                return null;
        }
            }
    if (!params.id) {
        console.error('Job ID is missing');
        return;
    }
    const { data, isLoading, error, refetch } = useFetch('job-details', { job_id: params.id });
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch().then(() => setRefreshing(false));
      }, []);
      
    const handleShare = () => {
        if (data.length > 0) {
            const jobTitle = data[0].job_title;
            const jobUrl = data[0].job_google_link;
            Share.share({
                message: `Check out this job: ${jobTitle}\n\n${jobUrl}`,
                url: jobUrl,
                title: jobTitle
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.left} dimension={40} handlePress={() => router.back()} />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.share} dimension={30} handlePress={handleShare} />
                    ),
                    headerTitle: "Job Details",
                }}
            />
            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {isLoading ? (
                    <ActivityIndicator size='large' color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) :data.length === 0 ? (
                    <Text>No Data</Text>
                ) : (
                    <View style ={{padding: SIZES.medium, paddingBottom: 100}}>
                    <Company companyLogo={data[0].employer_logo}
                    jobTitle={data[0].job_title}
                    companyName={data[0].employer_name}
                    location={data[0].job_country}
                    />
                    <JobTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    
                     />
                     {displayTabContent()}
                       
                    </View>

                )
                }
                </ScrollView>
                <JobFooter 
                url = {data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
                />
            </>

        </SafeAreaView>
    );
}

export default JobDetails;