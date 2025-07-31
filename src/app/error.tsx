'use client';

import { Button, Result } from 'antd';

export default function GlobalError({ reset }: { reset: () => void }) {
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
        status="500"
        title="Something went wrong"
        subTitle="An unexpected error occurred. You can try refreshing the page."
        extra={<Button type="primary" onClick={() => reset()}>Try Again</Button>}
      />
    </div>
  );
}
