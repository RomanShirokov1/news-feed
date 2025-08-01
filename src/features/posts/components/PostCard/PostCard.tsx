import { Card, Tag, Typography, Space } from 'antd';
import { LikeOutlined, DislikeOutlined, EyeOutlined } from '@ant-design/icons';
import React from 'react';

import { Post } from '@/types/post';

import styles from './index.module.css';

const { Title, Paragraph } = Typography;

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Card className={styles.card}>
      <Title level={4}>{post.title}</Title>
      <Paragraph className={styles.body}>{post.body}</Paragraph>

      <div className={styles.cardBottom}>
        <Space wrap>
          {post.tags.map((tag) => (
            <Tag key={tag} color="blue">
              #{tag}
            </Tag>
          ))}
        </Space>
        <Space style={{ gap: 16 }}>
          <span>
            <LikeOutlined /> {post.reactions.likes}
          </span>
          <span>
            <DislikeOutlined /> {post.reactions.dislikes}
          </span>
          <span>
            <EyeOutlined /> {post.views}
          </span>
        </Space>
      </div>
    </Card>
  );
};
