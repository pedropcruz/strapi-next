import gql from 'graphql-tag'
import Link from 'next/link'
import { graphql } from 'react-apollo'
import { Button, Card, CardBody, CardColumns, CardImg,CardSubtitle,CardText,
				 CardTitle, Col, Row } from 'reactstrap';

const RestaurantList = ({
	data: { loading, error, restaurants }, search }) => {
	if(error)
		return "Error loading restaurants"
		//if restaurants are returned from the GraphQL query, run the filter query
		//and set equal to variable restaurantSearch
	if(restaurants && restaurants.length) {
		//restaurantSearch will hold filtered results
	let restaurantSearch = restaurants.filter(
			query => query.name.toLowerCase().includes(search))
			//if no results are found, display message
		if(restaurantSearch.length == 0) {
			return (<h1>No Restaurants Found</h1>)
		} else {
			return (
                <Row>
				 <Col>
					<CardColumns className="h-100" >
					{
						restaurantSearch.map(res =>
						<Card className="h-100" style={{ marginBottom: 0, position: 'relative' }} key={res._id}>
							<CardImg top={true} style={{ height:250 }}src={`http://localhost:1337${res.image.url}`}/>
							<CardBody>
								<CardTitle>{res.name}</CardTitle>
								<CardText>{res.description}</CardText>
							</CardBody>
							<div className="card-footer">
								<Button color="primary">
									<Link as={`/dishes/${res.name.replace(/\s+/g, '-').toLowerCase()}`}
												href={`/dishes?id=${res._id}`}>
										<a>View</a>
									</Link>
								</Button>
							</div>
						</Card> )}
					</CardColumns>
				</Col>
					<style jsx>
						{`
							a {
								color: white;
							}
							a:link {
								text-decoration: none;
								color: white;
							}
						`}
					</style>
				</Row>
            );
		}
	}
}

const query = gql `
{
  restaurants {
    _id
    name
    description
    image { url }
  }
}
`
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default graphql(query, {
	props: ({
		data
	}) => ({
		data
	})
})(RestaurantList)