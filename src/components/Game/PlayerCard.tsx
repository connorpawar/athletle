import {
	Box,
	Center,
	useColorModeValue,
	Heading,
	Text,
	Stack,
  } from '@chakra-ui/react';
import { Silhouette } from '../Misc/Silhouette';
  
  export interface PlayerCardProps {
	image: string;
  };

  export function PlayerCard({
	image
  }: PlayerCardProps) {
	return (
	  <Center py={12}>
		<Box
		  role={'group'}
		  p={6}
		  maxW={'330px'}
		  w={'full'}
		  bg={useColorModeValue('white', 'gray.800')}
		  boxShadow={'2xl'}
		  rounded={'lg'}
		  pos={'relative'}
		  zIndex={1}>
		  <Box
			rounded={'lg'}
			mt={-12}
			pos={'relative'}
			height={'230px'}
			_after={{
			  transition: 'all .3s ease',
			  content: '""',
			  w: 'full',
			  h: 'full',
			  pos: 'absolute',
			  top: 5,
			  left: 0,
			  backgroundImage: `url(${image})`,
			  filter: 'blur(15px)',
			  zIndex: -1,
			}}
			_groupHover={{
			  _after: {
				filter: 'blur(20px)',
			  },
			}}>
			<Silhouette height={230} width={282} objectFit={"contain"} src={image} />
		  </Box>
		  <Stack pt={10} align={'center'}>
			<Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
			  Do you know who this is this?
			</Text>
			<Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
			  Give it your best guess!
			</Heading>
		  </Stack>
		</Box>
	  </Center>
	);
  }