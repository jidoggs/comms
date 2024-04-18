'use client';
import Link from 'next/link';
import React from 'react';
import { Button, Layout, Result } from 'antd';
// import PublicHeader from "@/components/public/header";
// import PublicFooter from "@/components/public/footer";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  margin: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const NotFound = () => {
  return (
    // <div>
    //   <h2>Not Found</h2>
    //   <p>Could not find requested resource</p>
    //   <Link href="/">Return Home</Link>
    // </div>
    <Layout className="w-full">
      <Layout>
        {/* <PublicHeader /> */}
        <Content style={contentStyle}>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <div className="flex w-full items-center justify-center">
                <Link href="/">
                  <Button type="primary" className="bg-green-minst">
                    Return Home
                  </Button>
                </Link>
              </div>
            }
          />
        </Content>
        {/* <PublicFooter /> */}
      </Layout>
    </Layout>
  );
};

export default NotFound;
