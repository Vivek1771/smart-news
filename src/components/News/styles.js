import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(() => ({
    container: {
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        padding: '3%',
        borderRadius: 10,
        color: 'white',
        backgroundColor: 'rgba(21, 101, 192)',
        margin: '0 12px',
        textAlign: 'center',
        height: '25vmin',
    },
    footer: {
        textAlign: 'center',
        position: 'fixed',
        left: 0,
        bottom: 0,
        color: 'white',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '120px',
    },
    link: {
        textDecoration: 'none',
        color: 'rgba(21, 101, 192)',
    },
}));