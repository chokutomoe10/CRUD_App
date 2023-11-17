import { Box, Center, Card, Container, Grid, Image, Flex, Text, Input, Button } from "@chakra-ui/react"

export default function Product({ item }) {
    return (
        <>
            <Card maxW={'230px'} borderRadius={'0px'}>
                <Image height={'300px'} src="https://images.unsplash.com/photo-1535683577427-740aaac4ec25?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />    
                <Box px={'17px'} mt={'5px'}>
                    <Text as={'b'}>{item.name}</Text>
                    <Text mb={'30px'}>IDR{item.price}</Text>
                </Box>
            </Card>
        </>
    )
}