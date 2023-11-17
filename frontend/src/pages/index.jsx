import { Box, Center, Card, Container, Grid, GridItem, Flex, Text, Input, InputGroup, InputRightElement, Button, Heading, Image, SimpleGrid } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'
import Product from "@/components/Products"
import { useEffect, useState } from "react"
import { API } from "@/lib/api"

export default function LandingPage() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const response = await API.get('/product')
            setProducts(response.data)
            console.log(response.data);
        } catch (error) {
            console.error('error get products', error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <Card borderRadius={'0px'} boxSize={'60px'} w={'100%'}>
                <Flex justifyContent={'space-between'} mt={'10px'}>
                    <Text ml={'100px'} mt={'5px'}>Logo</Text>
                    <InputGroup w={'900px'}>
                        <Input placeholder='Enter amount' />
                        <InputRightElement>
                            <SearchIcon />
                        </InputRightElement>
                    </InputGroup>
                    <Box>
                        <Button mr={'17px'} fontSize={'xs'}>MASUK</Button>
                        <Button mr={'40px'} fontSize={'xs'} colorScheme="blue">DAFTAR</Button>
                    </Box>
                </Flex>
            </Card>
            <Flex px={'200px'} py={'50px'} flexDirection={'column'} gap={'50px'}>
                <Box>
                    <Text fontSize={'lg'} as={'b'}>Terbaru</Text>
                    <SimpleGrid spacing={3} mt={6} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        {products.map((item) => {
                            return (
                                <Product item={item}/>
                            )
                        })}
                    </SimpleGrid>
                    <Box>Haloo</Box>
                </Box>
                <Box>
                    <Text fontSize={'lg'} as={'b'}>Produk Tersedia</Text>
                    <SimpleGrid spacing={3} mt={6} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        {products.map((item) => {
                            return (
                                <Product item={item}/>
                            )
                        })}
                    </SimpleGrid>
                </Box>
            </Flex>
            {/* <Grid
                templateAreas={`"header header"
                                "main main"
                                "footer footer"`}
                gridTemplateRows={'66px 1fr 200px'}
                gridTemplateColumns={'200px 1fr'}
                h='100vh'
                // gap='1'
                // color='blackAlpha.700'
                // fontWeight='bold'
            >
            <GridItem pl='70px' pt={'16px'} area={'header'}>
                <Flex justifyContent={'space-between'}>
                    <Text mt={'5px'}>Logo</Text>
                    <InputGroup w={'900px'}>
                        <Input placeholder='Enter amount' />
                        <InputRightElement>
                            <SearchIcon />
                        </InputRightElement>
                    </InputGroup>
                    <Box>
                        <Button mr={'17px'} fontSize={'xs'}>MASUK</Button>
                        <Button mr={'40px'} fontSize={'xs'} colorScheme="blue">DAFTAR</Button>
                    </Box>
                </Flex>
            </GridItem>
            <GridItem py='50px' px={'100px'} bg='green.300' area={'main'}>
                <Flex flexDirection={'column'} gap={'130px'}>
                    <Box>
                        <Text>Terbaru</Text>
                        <Box>Haloo</Box>
                    </Box>
                    <Box>
                        <Text>Produk Tersedia</Text>
                        <Box>Haloo</Box>
                    </Box>
                </Flex>
            </GridItem>
            <GridItem p='100px' bg='red' area={'footer'}>
                Footer
            </GridItem>
            </Grid> */}
        </>
    )
}