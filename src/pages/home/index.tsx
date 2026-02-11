import {
  Box,
  Button,
  Card,
  HStack,
  Input,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useGetMissionCountsApi } from 'apis/use-get-mission-counts';
import { usePageParams } from 'hooks/use-page-params';
import { Layout } from 'layouts';
import { useEffect, useState } from 'react';
import { ChartComponent } from './components/case-component';
import { HeatMap } from './components/heat-map';
import { File1Icon } from './icons/file1-icon';
import { File2Icon } from './icons/file2-icon';
import { File3Icon } from './icons/file3-icon';
import { File4Icon } from './icons/file4-icon';
import { File5Icon } from './icons/file5-icon';
import { File6Icon } from './icons/file6-icon';
import { File7Icon } from './icons/file7-icon';
import { HappyIcon } from './icons/happy-icon';
import { NormalIcon } from './icons/normal-icon';
import { SadIcon } from './icons/sad-icon';

const stats = [
  { id: 1, label: 'كل المهام', bg: '#E2ECA6', icon: File1Icon },
  { id: 2, label: 'مهام قيد المراجعة', bg: '#B8EFB7', icon: File2Icon },
  { id: 3, label: 'مهام قيد الإسناد', bg: '#E6E6E6', icon: File3Icon },
  { id: 4, label: 'المهام المسندة', bg: '#FFD2D2', icon: File4Icon },
  { id: 5, label: 'المهام تحت التنفيذ', bg: '#C7EAF2', icon: File5Icon },
  { id: 6, label: 'الملفات التي بها عقبات وموانع', bg: '#B8EFB7', icon: File6Icon },
  { id: 7, label: 'المهام المُنتهية', bg: '#E9E9E9', icon: File7Icon },
];

const HomePage = () => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [startDate, setStartDate] = useState(oneMonthAgo.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
  const { setPageParams, getPageParams } = usePageParams();
  const params = getPageParams();
  const { isLoading, data: getMissionCounts } = useGetMissionCountsApi({ enabled: !!params?.from && !!params?.to });
  const { data } = getMissionCounts || {};

  useEffect(() => {
    if (!!params?.from && !!params?.to) return;

    setPageParams({
      from: startDate,
      to: endDate,
    });
  }, [startDate, endDate]);

  const handletoogleparam = (type?: string) => {
    setPageParams({
      ...params,
      type: type ?? null,
    });
  };

  return (
    <Layout type='base_layout'>
      <VStack align={'stretch'} gap={6}>
        <HStack w={'fit-content'}>
          <Text>من</Text>

          <Input
            required
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate || undefined}
          />

          <Text>الى</Text>

          <Input
            required
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined}
          />
        </HStack>

        <Box h={'2px'} w={'full'} bg={'#D9D9D9'} />

        <Text fontWeight={'semibold'}>نظرة سريعة</Text>

        <HStack flexWrap={'wrap'} gap={4}>
          {isLoading &&
            Array.from({ length: 7 }).map((_, index) => (
              <Card.Root key={index} flex='20%' minH='110px' bg='gray.400' boxShadow='sm'>
                <Card.Body as={VStack} alignItems='stretch' justifyContent='center'>
                  <HStack gap={4}>
                    <SkeletonCircle size='12' />

                    <Stack flex='1'>
                      <Skeleton height='5' width='40%' />
                      <Skeleton height='5' />
                    </Stack>
                  </HStack>
                </Card.Body>
              </Card.Root>
            ))}

          {!isLoading &&
            data?.dashboardCounts?.map((dashboardCount: any) => {
              const matchedStat = stats.find((s) => s.id == dashboardCount?.id);
              const Icon = matchedStat?.icon;

              return (
                <Card.Root
                  key={dashboardCount?.id}
                  flex={'20%'}
                  minH={'110px'}
                  bg={matchedStat?.bg || 'gray.100'}
                  boxShadow='sm'>
                  <Card.Body as={VStack} alignItems={'stretch'} justifyContent={'center'}>
                    <HStack gap={4}>
                      {Icon && <Icon />}

                      <VStack align='stretch'>
                        <Text fontWeight='semibold' fontSize='lg'>
                          {dashboardCount?.totalCount}
                        </Text>

                        <Text>{matchedStat?.label}</Text>
                      </VStack>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              );
            })}
        </HStack>

        <SimpleGrid columns={2} gap='4'>
          <ChartComponent cse={data?.caseTypes} title='أنواع الملفات' />

          <ChartComponent cse={data?.missionTypes} title='أنواع الإنتقالات' />
        </SimpleGrid>

        <HStack justify={'space-between'} gap={4}>
          <Text fontWeight={'semibold'}>الخريطة الحرارية</Text>

          <HStack>
            <Button
              onClick={() => handletoogleparam()}
              bg={!!params?.type ? '#F0F0F0' : '#B68A35'}
              color={!!params?.type ? 'black' : 'white'}>
              مواقع القائمين بالتنفيذ
            </Button>

            <Button
              onClick={() => handletoogleparam('messions')}
              bg={!!params?.type ? '#B68A35' : '#F0F0F0'}
              color={!!params?.type ? 'white' : 'black'}>
              أنواع المهام
            </Button>
          </HStack>
        </HStack>
        <HeatMap data={data?.missionDetails || []} />

        <Text fontWeight={'semibold'}>استبيان سعادة المُتعاملين</Text>

        <HStack flexWrap={'wrap'} gap={4}>
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <Card.Root key={index} flex='20%' minH='110px' bg='gray.400' boxShadow='sm'>
                <Card.Body as={VStack} alignItems='stretch' justifyContent='center'>
                  <HStack gap={4}>
                    <SkeletonCircle size='12' />

                    <Stack flex='1'>
                      <Skeleton height='5' width='40%' />
                      <Skeleton height='5' />
                    </Stack>
                  </HStack>
                </Card.Body>
              </Card.Root>
            ))}

          {!isLoading && (
            <>
              <Card.Root flex='20%' minH='110px' boxShadow='sm'>
                <Card.Body as={VStack} alignItems='stretch' justifyContent='center'>
                  <HStack gap={4}>
                    <Stack flex='1'>
                      <Text fontWeight='semibold' fontSize='lg'>
                        {data?.surveyWithNumbers?.total3Star}
                      </Text>

                      <Text> راضٍ جداً </Text>
                    </Stack>

                    <HappyIcon />
                  </HStack>
                </Card.Body>
              </Card.Root>

              <Card.Root flex='20%' minH='110px' boxShadow='sm'>
                <Card.Body as={VStack} alignItems='stretch' justifyContent='center'>
                  <HStack gap={4}>
                    <Stack flex='1'>
                      <Text fontWeight='semibold' fontSize='lg'>
                        {data?.surveyWithNumbers?.total2Star}
                      </Text>

                      <Text>راضٍ</Text>
                    </Stack>

                    <NormalIcon />
                  </HStack>
                </Card.Body>
              </Card.Root>

              <Card.Root flex='20%' minH='110px' boxShadow='sm'>
                <Card.Body as={VStack} alignItems='stretch' justifyContent='center'>
                  <HStack gap={4}>
                    <Stack flex='1'>
                      <Text fontWeight='semibold' fontSize='lg'>
                        {data?.surveyWithNumbers?.total1Star}
                      </Text>

                      <Text> غير راضٍ</Text>
                    </Stack>

                    <SadIcon />
                  </HStack>
                </Card.Body>
              </Card.Root>
            </>
          )}
        </HStack>
      </VStack>
    </Layout>
  );
};
export default HomePage;
