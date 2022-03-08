import Link from 'next/link';
import Image from 'next/image';
import { Button, Card, CardActions, CardContent } from '@mui/material';

const CardComponent = ({show}) => {
    return(
        <>
            <Card>
                <Image
                    src={`/images/venues/${show.image}`}
                    layout="responsive"
                    width="1920"
                    height="1080"
                    alt='image'
                />

                <CardContent>
                    <h5>{show.title}</h5>
                    <p>{show.excerpt}</p>
                </CardContent>

                <CardActions>
                    <Link passHref href={`/shows/${show.slug}`}>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            See show
                        </Button>
                    </Link>
                </CardActions>

            </Card>
        </>
    )
}

export default CardComponent;