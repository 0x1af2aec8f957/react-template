import React from 'react'
import styles from './About.css'
import Layout from '../../template/Layout'
import { Title } from '../../template/Elements'

export default (props) => (
  <Layout.Content>
    <Layout.Container>
      <Title.SubTitle className={styles['text-black']}>This page is About</Title.SubTitle>
      <strong className="has-text-grey">Relevant information:</strong>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Layout.Container>
  </Layout.Content>
);
