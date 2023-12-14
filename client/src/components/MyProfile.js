import { useOutletContext, NavLink } from "react-router-dom"
import { Grid, GridItem, Heading, Center, Tabs, TabPanels, Tab, TabList, TabPanel, Button, Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, Box } from "@chakra-ui/react"
import ProfileTab from "./ProfileTab"
import CreatedEventsTab from "./CreatedEventsTab"

function MyProfile(){
    const {user, setUser, setEvents} = useOutletContext()

    return(
        <>
        <Breadcrumb m='10px' fontWeight='medium' fontSize='lg'>
            <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to='/'>
                Home
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>
                    My Profile
                </BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Grid
            templateAreas={`"header header"
                            "main main"`}
            gridTemplateRows={'110px 1fr'}
            gridTemplateColumns={'150px 1fr'}
            h='85vh'
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
            marginTop={'10px'}
            >
            <GridItem pl='2' bg='white' borderRadius='5px' area={'header'} marginTop={'10px'}>
                <HStack h='90px'>
                    <Avatar size='xl' name={user.first_name} src={user.img_url}/>
                    <Heading textColor='black' textAlign={'center'}>{user.first_name} {user.last_name}'s Profile</Heading>
                </HStack>
            </GridItem>
            <GridItem pl='2' bg='white' area={'main'} padding='10px'>
                <Tabs isFitted variant={'enclosed'}>
                    {/* <Avatar size='lg'></Avatar> */}
                    <TabList>
                        <Tab>Profile Information</Tab>
                        <Tab>Created Events</Tab>
                        <Tab>Registered Events</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <ProfileTab user={user} setUser={setUser}/>
                        </TabPanel>
                        <TabPanel>
                            <CreatedEventsTab user={user} setUser={setUser} setEvents={setEvents}/>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </GridItem>

        </Grid>
        </>
    )
}

export default MyProfile
