import { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { EntryListItem, NewEntry } from '../components/ui';
import { Grid, Card, CardHeader } from '@mui/material';
import Entry from '../components/Entry';
import { useUIContext } from '../context';


const Home: NextPage = () => {

  const { modalEntry, changeModalEntry } = useUIContext()

  return (
    <Layout title='Home'>
      <Grid container spacing={2} padding='10px 20px'>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
            <NewEntry />
            <EntryListItem status='pending'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso" />
            <EntryListItem status='in-progress'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" />
            <EntryListItem status='finished'/>
          </Card>
        </Grid>

      </Grid>
      <Grid>
        {
          modalEntry && <Entry modal={modalEntry} onChange={changeModalEntry}/>
        }
      </Grid>
    </Layout>
  )
};

export default Home;
