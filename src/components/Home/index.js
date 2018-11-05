import React from 'react'
import styles from './Home.css'
import Layout from '../../template/Layout'
import { Title } from '../../template/Elements'

export default (props) => (
  <Layout.Content>
    <Layout.Container>
      <Title.SubTitle className={styles['text-red']}>This page is Home</Title.SubTitle>
      <strong className="has-text-grey">Relevant information:</strong>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Layout.Container>
  </Layout.Content>
);
