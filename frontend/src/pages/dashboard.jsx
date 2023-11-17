import { Box, Card, Table, TableContainer, Thead, Tr, Td, Tbody, Th, Flex, Text, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { API } from "@/lib/api"

export default function Dashboard() {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const response = await API.get('/user')
            setUsers(response.data)
            console.log(response.data);
        } catch (error) {
            console.error('error get users', error);
        }
    }

    useEffect(() => {
        getUsers();
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
                    <Text bgColor={'blue.500'} color={'white'}>Dashboard</Text>
                    <Text>Manajemen User</Text>
                    <Text>Manajemen Produk</Text>
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
                                <Th>Nama Lengkap</Th>
                                <Th>Email</Th>
                                <Th isNumeric>No Telepon</Th>
                                <Th>Status</Th>
                                <Th></Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {users.map((item, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{index}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.email}</Td>
                                            <Td isNumeric>{item.phone}</Td>
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