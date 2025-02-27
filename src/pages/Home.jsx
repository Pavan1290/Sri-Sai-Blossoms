import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  Flex,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Box
        bg="brand.primary"
        color="white"
        py={{ base: '16', md: '24' }}
      >
        <Container maxW="1300px">
          <Flex
            align="center"
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 8, md: 10 }}
          >
            <Box flex={1}>
              <Heading
                as="h1"
                size={useBreakpointValue({ base: 'xl', md: '2xl' })}
                mb={4}
              >
                Welcome to Sri Sai Blossoms
              </Heading>
              <Text fontSize="xl" mb={6}>
                Beautiful floral arrangements for every occasion
              </Text>
              <Button
                bg="white"
                color="brand.primary"
                size="lg"
                _hover={{ bg: 'gray.200' }}
              >
                Explore Our Collection
              </Button>
            </Box>
            <Box flex={1}>
              <Image
                src="/images/hero-image.jpg"
                alt="Floral arrangement"
                borderRadius="md"
                fallbackSrc="https://via.placeholder.com/600x400"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={16}>
        <Container maxW="1300px">
          <Heading textAlign="center" mb={16}>Our Services</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {[
              {
                title: 'Wedding Arrangements',
                text: 'Beautiful floral designs for your special day',
                image: '/images/wedding.jpg'
              },
              {
                title: 'Event Decoration',
                text: 'Creative arrangements for all events and occasions',
                image: '/images/event.jpg'
              },
              {
                title: 'Custom Bouquets',
                text: 'Handcrafted bouquets tailored to your preferences',
                image: '/images/bouquet.jpg'
              }
            ].map((feature, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.02)' }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  h="200px"
                  w="100%"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/400x200"
                />
                <Stack p={5}>
                  <Heading size="md">{feature.title}</Heading>
                  <Text>{feature.text}</Text>
                  <Button variant="outline" colorScheme="blue" mt={3}>
                    Learn More
                  </Button>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
