'use client';

import Link from 'next/link';
import { Button, Result } from 'antd';

export default function NotFoundPage() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/" passHref>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
}
