// @ts-nocheck
import { Button, Field, Input, Text, VStack } from '@chakra-ui/react';
import { Layout } from 'layouts';
import { useLoginFormHandler } from './hooks/use-login-form-handler';

const LoginPage = () => {
  const { errors, handleSubmit, onSubmit, isLoadingSendLogin, register } = useLoginFormHandler();

  return (
    <Layout type='pre_login_layout'>
      <VStack w={'full'} align={'stretch'} gap={'8'} as={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Text fontWeight={'semibold'} fontSize={'lg'}>
          تسجيل الدخول
        </Text>

        <VStack gap={'4'}>
          <Field.Root invalid={!!errors?.username?.message}>
            <Input placeholder='اسم المستخدم' {...register('username')} />
            <Field.ErrorText>{errors?.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors?.password?.message}>
            <Input type='password' placeholder='كلمة المرور' {...register('password')} />
            <Field.ErrorText>{errors?.password?.message}</Field.ErrorText>
          </Field.Root>
        </VStack>

        <Button type='submit' loading={isLoadingSendLogin} bg={'rgba(182, 138, 53, 1)'}>
          تسجيل الدخول
        </Button>
      </VStack>
    </Layout>
  );
};
export default LoginPage;
