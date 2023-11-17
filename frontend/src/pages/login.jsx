import { Box, Center, Container, Grid, Flex, Text, Input, Button } from "@chakra-ui/react"

export default function Login() {
    return (
        <>
            <Grid h={'100vh'} templateColumns='repeat(2, 1fr)'>
                <Center bg={'blue.500'} display={'flex'} flexDirection={'column'}>
                    <Container centerContent>
                        <Text as={'b'} fontSize={'5xl'}>WELCOME</Text>
                        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores reiciendis quos nisi dolorum ex tempore incidunt vitae facilis! Minus libero minima at dicta sequi, debitis amet sapiente impedit odio.</Text>
                    </Container>
                </Center>
                <Center>
                    <Container>
                        <Text as={'b'} fontSize={'2xl'}>
                            Selamat Datang Admin
                        </Text>
                        <Text mt={'3'} fontSize={'sm'}>
                            Silahkan masukkan email atau nomor telepon dan password Anda untuk mulai mengggunakan aplikasi
                        </Text>
                        <Box mt='60px'>
                            <Text mb={2}>Email / Nomor Telpon</Text>
                            <Input />
                            <Text mt={5} mb={2}>Password</Text>
                            <Input />
                        </Box>
                        <Button w={'100%'} mt={'30px'} colorScheme="blue">Masuk</Button>
                    </Container>
                </Center>
            </Grid>
        </>
    )
}