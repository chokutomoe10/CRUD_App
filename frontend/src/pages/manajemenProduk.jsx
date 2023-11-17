import { Box, Center, Card, Container, Table, TableContainer, TableCaption, Thead, Tr, Td, Tbody, Tfoot, Th, GridItem, Flex, Text, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { API } from "@/lib/api"

export default function ManajemenProduk() {
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
                    <Box>
                        <Text mr={'70px'} fontSize={'xs'}>Hallo Admin,</Text>
                        <Text mr={'70px'}>Aden S. Putra</Text>
                    </Box>
                </Flex>
            </Card>
            <Flex>
                <Card h={'677px'} direction={'column'} w={'300px'} borderRadius={'0px'}>
                    <Text>Dashboard</Text>
                    <Text>Manajemen User</Text>
                    <Text bgColor={'blue.500'} color={'white'}>Manajemen Produk</Text>
                </Card>
                <Box px={10} py={7} w={'100%'}>
                    <Flex justifyContent={'space-between'}>
                        <Text mb={10}>Manajemen User</Text>
                        <Button colorScheme="blue">TAMBAH USER</Button>
                    </Flex>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Nama</Th>
                                <Th>Harga</Th>
                                <Th>Gambar</Th>
                                <Th>Status</Th>
                                <Th></Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {products.map((item, index) => {
                                    return (
                                        <Tr>
                                            <Td>{index}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.price}</Td>
                                            <Td>{item.image}</Td>
                                            <Td>{item.status}</Td>
                                            <Td>icons</Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
        </>
    )
}