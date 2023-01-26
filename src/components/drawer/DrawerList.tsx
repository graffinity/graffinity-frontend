import { KeyboardArrowLeft } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	Typography,
} from "@mui/material";
import AppTheme from "AppTheme";
import RouteGroup from "models/routes/RouteGroup";
import RouteItem from "models/routes/RouteItem";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DrawerListProps {
	pathItems: RouteGroup[];
	setActivePage: (currentPage: RouteItem) => void;
	handleClose: () => void;
}

export function DrawerList(props: DrawerListProps) {
	const { pathItems, setActivePage, handleClose } = props;
	const navigate = useNavigate();
	const [activeItem, setActiveItem] = useState<RouteItem>();
	const [activeGroup, setActiveGroup] = useState<RouteGroup>();

	const navigateToTarget = (item: RouteItem, group: RouteGroup) => {
		let path = item.path.replaceAll(":id", "1");
		navigate(path);
		setActivePage(item);
		setActiveItem(item);
		setActiveGroup(group);
	};

	return (
		<div>
			{pathItems.map((group) => (
				<div
					key={group.group}
					style={{
						marginTop: "18px",
					}}
				>
					{group.items.length > 0 && (
						<div key={group.group}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<Typography
									variant="h3"
									color={AppTheme.palette.text.primary}
									sx={{
										fontWeight: "600",
										padding: "0px 16px",
									}}
									style={activeGroup === group ? { fontWeight: "600" } : {}}
								>
									{group.group}
								</Typography>
								<IconButton
									onClick={handleClose}
									style={{
										marginTop: "-24px",
										marginRight: "6px",
									}}
								>
									<KeyboardArrowLeft
										style={{
											height: "24px",
											width: "24px",
											opacity: "0.6",
											color: "#000000",
										}}
									/>
								</IconButton>
							</div>

							<Divider
								variant="fullWidth"
								style={{
									marginTop: "12px",
									backgroundColor: "#f2f2f2",
								}}
							/>
							<List>
								{group.items.map((item) => (
									<ListItem
										key={item.key}
										style={{
											borderBottom: "1px solid #f2f2f2",
											display: "flex",
											alignItems: "center",
											width: "100%",
											padding: "0px",
										}}
										sx={
											activeItem === item ? { backgroundColor: "#D9D9D9" } : {}
										}
									>
										<ListItemButton
											style={{
												minHeight: "36px",
												width: "100%",
											}}
											onClick={() => navigateToTarget(item, group)}
										>
											{item.icon ? (
												item.icon
											) : (
												<EmailIcon
													style={{
														width: "18px",
														height: "18px",
													}}
												/>
											)}
											<div
												style={{
													textDecoration: "none",
													padding: "8px 5px",
													marginLeft: "10px",
												}}
											>
												<Typography
													variant="h5"
													color={AppTheme.palette.text.primary}
												>
													{item.pageTitle}
												</Typography>
											</div>
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</div>
					)}
				</div>
			))}
		</div>
	);
}
