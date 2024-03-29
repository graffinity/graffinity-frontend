import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { AppBar, Link, Typography } from "@mui/material";
import "./Common.css";

export const MobileFooter = () => {
	return (
		<AppBar
			position="static"
			color="primary"
			sx={{ display: { xs: "block", md: "none" } }}
			style={{
				width: "100%",
				bottom: "0",
				background: "#202024",
			}}
		>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div className="footer-container">
					<div className="footer-section">
						<div className="footer-title">
							<Typography color="#FFFFFF" variant="h5">
								About Us
							</Typography>
						</div>
						<div className="footer-links">
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									Story
								</Typography>
							</Link>
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									Clients
								</Typography>
							</Link>
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									Testimonials
								</Typography>
							</Link>
						</div>
					</div>
					<div className="footer-section">
						<div className="footer-title">
							<Typography variant="h5" color="#FFFFFF">
								Services
							</Typography>
						</div>
						<div className="footer-links">
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									Marketing
								</Typography>
							</Link>
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									Consulting
								</Typography>
							</Link>
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									Development
								</Typography>
							</Link>
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									Design
								</Typography>
							</Link>
						</div>
					</div>
					<div className="footer-section">
						<div className="footer-title">
							<Typography variant="h5" color="#FFFFFF">
								Contact Us
							</Typography>
						</div>
						<div className="footer-links">
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									United States
								</Typography>
							</Link>
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									United Kingdom
								</Typography>
							</Link>
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									Australia
								</Typography>
							</Link>
							<Link href="#" className="link">
								<Typography variant="body" className="text">
									Support
								</Typography>
							</Link>
						</div>
					</div>
					<div className="footer-section">
						<div className="footer-title">
							<Typography variant="h5" color="#FFFFFF">
								Social
							</Typography>
						</div>
						<div className="footer-links">
							<Link href="#" className="text-and-icon">
								<FacebookIcon className="icon" />
								<Typography variant="body" className="text">
									Facebook
								</Typography>
							</Link>
							<Link href="#" className="link">
								<InstagramIcon className="icon" />
								<Typography variant="body" className="text">
									Instagram
								</Typography>
							</Link>
							<Link href="#" className="link">
								<YouTubeIcon className="icon" />
								<Typography variant="body" className="text">
									Youtube
								</Typography>
							</Link>
							<Link href="#" className="link">
								<TwitterIcon className="icon" />
								<Typography variant="body" className="text">
									Twitter
								</Typography>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</AppBar>
	);
};

export default MobileFooter;
