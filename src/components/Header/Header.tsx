import { Box, Container, Flex, Image, Text } from '@/ui'

const Header = () => {
  return (
    <Box py={4} bgColor="brand.secondary" mb={6}>
      <Container>
        <Flex gap={2} align="center">
          <Image src="./favicon/favicon.ico" />
          <Text fontSize="2xl" fontWeight="bold">
            MoveSmart
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
