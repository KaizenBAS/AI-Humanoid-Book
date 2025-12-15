import React from 'react';
import Layout from '@theme/Layout';
import { Card, CardContent } from '@site/src/components/ui/Card';

export default function About(): JSX.Element {
  return (
    <Layout title="About" description="Learn about the author and vision behind AI-Native Driven Development">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <Card variant="glass">
              <CardContent>
                <header className="hero hero--primary">
                  <div className="container text--center">
                    <img
                      src={require('@site/static/img/book-icon.svg').default}
                      alt="Book Icon"
                      className="margin-bottom--lg"
                      style={{ maxWidth: '100px', height: 'auto' }}
                    />
                    <h1 className="hero__title gradient-text">About the Author</h1>
                  </div>
                </header>
                
                <div className="margin-vert--lg">
                  <h2>Meet the Author</h2>
                  <p>
                    The author of "AI-Native Driven Development" is a seasoned AI researcher and software architect 
                    with over 15 years of experience in building intelligent systems. Their expertise spans across 
                    machine learning, distributed systems, and user experience design.
                  </p>
                  
                  <h2>Author's Vision</h2>
                  <p>
                    This book represents a comprehensive exploration of how artificial intelligence can be seamlessly 
                    integrated into modern software development practices from the ground up. The vision is to provide 
                    a practical guide for developers who want to build truly AI-native applications that leverage the 
                    full potential of artificial intelligence while maintaining robust engineering principles.
                  </p>
                  
                  <p>
                    The approach outlined in this book emphasizes building systems that are not just enhanced with 
                    AI capabilities, but are fundamentally architected with AI as a core component, resulting in more 
                    adaptive, intelligent, and efficient applications.
                  </p>
                  
                  <h2>Our Mission</h2>
                  <p>
                    Our mission is to bridge the gap between traditional software development and advanced AI 
                    implementation, providing clear, practical guidance that helps developers navigate the 
                    complexities of AI-native development. We believe that the future of software lies in systems 
                    that are designed with intelligence at their core, rather than as an afterthought.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}