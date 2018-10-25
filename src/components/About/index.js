import React from 'react'
import styles from './About.css'
import Layout from '../../template/Layout'
import { Title } from '../../template/Elements'

export default (props) => (
  <Layout.Content>
    <Layout.Container>
      <Title.Subtitle className={styles['text-black']}>This page is
        About</Title.Subtitle>
      <strong className="has-text-grey">Relevant information:</strong>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Layout.Container>
  </Layout.Content>
);
