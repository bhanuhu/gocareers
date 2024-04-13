import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Pagination,
  Button,
  Stack,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { PaginationItem } from "@mui/material";
const productsData = [
  // Sample product data
  {
    id: 1,
    name: "Full Stack Developer",
    category: "Intern",
    salary: 500000,
    brand: "Amazon",
    skills: "MERN",
    exp: "0-1",
    location: "Noida",
  },
  {
    id: 2,
    name: "Front End Developer",
    category: "Full Time",
    salary: 1000000,
    brand: "Flipkart",
    skills: "React",
    exp: "2-3",
    location: "Pune",
  },
  {
    id: 3,
    name: "Backend Developer",
    category: "Intern",
    salary: 1500000,
    brand: "Facebook",
    skills: "MERN",
    exp: "1-2",
    location: "Delhi",
  },
  {
    id: 4,
    name: "Software Engineer",
    category: "Full Time",
    salary: 1000000,
    brand: "Google",
    skills: "React",
    exp: "2-3",
    location: "Hyderabad",
  },
  {
    id: 5,
    name: "Full Stack Developer",
    category: "Intern",
    salary: 1500000,
    brand: "GoComet",
    skills: "MERN",
    exp: "3-5",
    location: "Jaipur",
  },
  {
    id: 6,
    name: "Front End Developer",
    category: "Full Time",
    salary: 700000,
    brand: "Meta",
    skills: "React",
    exp: "2-3",
    location: "Pune",
  },
  {
    id: 7,
    name: "Backend Developer",
    category: "Intern",
    salary: 600000,
    brand: "Linkedin",
    skills: "MERN",
    exp: "0-1",
    location: "Noida",
  },
  {
    id: 8,
    name: "Front End Developer",
    category: "Full Time",
    salary: 800000,
    brand: "Hashedin",
    skills: "React",
    exp: "5-10",
    location: "Remote",
  },
  {
    id: 9,
    name: "Full Stack Developer",
    category: "Intern",
    salary: 900000,
    brand: "Delloite",
    skills: "MERN",
    exp: "0-1",
    location: "Noida",
  },
  {
    id: 10,
    name: "Backend Developer",
    category: "Full Time",
    salary: 700000,
    brand: "Flipkart",
    skills: "React",
    exp: "3-5",
    location: "Bangalore",
  },
  {
    id: 11,
    name: "Full Stack Developer",
    category: "Intern",
    salary: 1500000,
    brand: "Amazon",
    skills: "MERN",
    exp: "5-10",
    location: "Noida",
  },
  {
    id: 12,
    name: "Software Engineer",
    category: "Full Time",
    salary: 1200000,
    brand: "Google",
    skills: "React",
    exp: "2-3",
    location: "Remote",
  },
  // Add more products here
];

const categories = ["Intern", "Full Time"];
const brands = [
  "Full Stack Developer",
  "Front End Developer",
  "Backend Developer",
  "Software Engineer",
];
const locations = [
  "Delhi",
  "Noida",
  "Pune",
  "Hyderabad",
  "Jaipur",
  "Bangalore",
  "Gurgaon",
  "Remote",
];
const experience = ["0-1", "1-2", "2-3", "3-5", "5-10"];

const FilterComponent = () => {
  const [products, setProducts] = useState(productsData);
  const [filters, setFilters] = useState({
    category: [],
    name: [],
    priceRange: "",
    location: [],
    exp: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterData, setShowFilterData] = useState(false);
  const itemsPerPage = 5;
  const showFilterIcon = useMediaQuery('(max-width:853px)') ? true : false
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (
        filters.category.length > 0 &&
        !filters.category.includes(product.category)
      ) {
        return false;
      }
      // Skills filter (not brand)
      if (filters.name.length > 0 && !filters.name.includes(product.name)) {
        return false;
      }
      if (
        filters.location.length > 0 &&
        !filters.location.includes(product.location)
      ) {
        return false;
      }
      if (filters.exp.length > 0 && !filters.exp.includes(product.exp)) {
        return false;
      }
      // Price range filter

      return true;
    });
  }, [filters, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handler for page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleButtonClick = () => {
    setShowFilterData(!showFilterData)
  }

  return (
    <Box>
      <Stack direction={{ sx: "column", md: "row" }} >
        {/* filtered data component */}
        {showFilterIcon && (
          <Button onClick={handleButtonClick} variant="contained" sx={{ background: "grey", width: "200px", mt: "50px", mx: "50px" }}>
            Filter <TuneIcon></TuneIcon>
          </Button>
        )}
        {showFilterData && <Box
          justifyContent="space-between"
          marginBottom={2}
          sx={{ ml: 8, mr: 4 }}
        >
          {/* Category Filter */}
          <Typography variant="h4" sx={{ mt: "7%", mb: "4%", ml: "3%" }}>
            Filter Jobs
          </Typography>

          <Stack direction="row" sx={{ mr: "4%", ml: "-6%" }}>
            <Stack>
              <FormControl component="fieldset" sx={{ mb: "4%" }}>
                <Typography variant="h6">Employment Type</Typography>
                <FormGroup sx={{ ml: "7%" }}>
                  {categories.map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          checked={filters.category.includes(category)}
                          onChange={(e) => {
                            const value = e.target.checked
                              ? [...filters.category, category]
                              : filters.category.filter(
                                (c) => c !== category
                              );
                            handleFilterChange("category", value);
                          }}
                        />
                      }
                      label={category}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <FormControl component="fieldset" sx={{ mb: "4%" }}>
                <Typography variant="h6">Experience</Typography>
                <FormGroup sx={{ ml: "7%" }}>
                  {experience.map((exp) => (
                    <FormControlLabel
                      key={exp}
                      control={
                        <Checkbox
                          checked={filters.exp.includes(exp)}
                          onChange={(e) => {
                            const value = e.target.checked
                              ? [...filters.exp, exp]
                              : filters.exp.filter((l) => l !== exp);
                            handleFilterChange("exp", value);
                          }}
                        />
                      }
                      label={exp}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              {/* Brand Filter */}
              <FormControl component="fieldset">
                <Typography variant="h6">Job Category</Typography>
                <FormGroup sx={{ ml: "7%", mr: "-20%" }}>
                  {brands.map((name) => (
                    <FormControlLabel
                      key={name}
                      control={
                        <Checkbox
                          checked={filters.name.includes(name)}
                          onChange={(e) => {
                            const value = e.target.checked
                              ? [...filters.name, name]
                              : filters.name.filter((s) => s !== name);
                            handleFilterChange("name", value);
                          }}
                        />
                      }
                      label={name}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Stack>
            <FormControl component="fieldset">
              <Typography variant="h6">Location</Typography>
              <FormGroup sx={{ ml: "7%" }}>
                {locations.map((location) => (
                  <FormControlLabel
                    key={location}
                    control={
                      <Checkbox
                        checked={filters.location.includes(location)}
                        onChange={(e) => {
                          const value = e.target.checked
                            ? [...filters.location, location]
                            : filters.location.filter((l) => l !== location);
                          handleFilterChange("location", value);
                        }}
                      />
                    }
                    label={location}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Stack>
        </Box>}
        {!showFilterIcon && (
          <Box
            justifyContent="space-between"
            marginBottom={2}
            sx={{ ml: 8, mr: 4 }}
          >
            {/* Category Filter */}
            <Typography variant="h4" sx={{ mt: "7%", mb: "4%", ml: "3%" }}>
              Filter Jobs
            </Typography>

            <Stack direction="row" sx={{ mr: "4%", ml: "-6%" }}>
              <Stack>
                <FormControl component="fieldset" sx={{ mb: "4%" }}>
                  <Typography variant="h6">Employment Type</Typography>
                  <FormGroup sx={{ ml: "7%" }}>
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category}
                        control={
                          <Checkbox
                            checked={filters.category.includes(category)}
                            onChange={(e) => {
                              const value = e.target.checked
                                ? [...filters.category, category]
                                : filters.category.filter(
                                  (c) => c !== category
                                );
                              handleFilterChange("category", value);
                            }}
                          />
                        }
                        label={category}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <FormControl component="fieldset" sx={{ mb: "4%" }}>
                  <Typography variant="h6">Experience</Typography>
                  <FormGroup sx={{ ml: "7%" }}>
                    {experience.map((exp) => (
                      <FormControlLabel
                        key={exp}
                        control={
                          <Checkbox
                            checked={filters.exp.includes(exp)}
                            onChange={(e) => {
                              const value = e.target.checked
                                ? [...filters.exp, exp]
                                : filters.exp.filter((l) => l !== exp);
                              handleFilterChange("exp", value);
                            }}
                          />
                        }
                        label={exp}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                {/* Brand Filter */}
                <FormControl component="fieldset">
                  <Typography variant="h6">Job Category</Typography>
                  <FormGroup sx={{ ml: "7%", mr: "-20%" }}>
                    {brands.map((name) => (
                      <FormControlLabel
                        key={name}
                        control={
                          <Checkbox
                            checked={filters.name.includes(name)}
                            onChange={(e) => {
                              const value = e.target.checked
                                ? [...filters.name, name]
                                : filters.name.filter((s) => s !== name);
                              handleFilterChange("name", value);
                            }}
                          />
                        }
                        label={name}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Stack>
              <FormControl component="fieldset">
                <Typography variant="h6">Location</Typography>
                <FormGroup sx={{ ml: "7%" }}>
                  {locations.map((location) => (
                    <FormControlLabel
                      key={location}
                      control={
                        <Checkbox
                          checked={filters.location.includes(location)}
                          onChange={(e) => {
                            const value = e.target.checked
                              ? [...filters.location, location]
                              : filters.location.filter((l) => l !== location);
                            handleFilterChange("location", value);
                          }}
                        />
                      }
                      label={location}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Stack>
          </Box>
        )}
        {/* Display Filtered Products */}
        <Box sx={{ ml: 8, mt: 4, mr: 5 }} >
          <Typography variant="h4" sx={{ mb: 3 }}>
            {" "}
            Jobs
          </Typography>
          <Grid container spacing={2}>
            <Stack width={showFilterIcon ? "100%" : { md: "250px", lg: "350px", xl: "500px" }}>
              {currentProducts.map((product) => (
                <Grid
                  item
                  key={product.id}
                  xs={12}
                  sx={{ width: "850%", mb: 2 }}
                  sm={12}
                  md={20}
                >
                  <Box border="1px solid gray" padding={2}>
                    <Typography variant="h6">
                      {product.name} ({product.category})
                    </Typography>

                    <Box sx={{ ml: 2 }}>
                      <Typography>{product.brand}</Typography>
                      <Stack direction="row">
                        <Typography sx={{ mr: 2 }}>
                          <AccountBalanceWalletOutlinedIcon
                            sx={{ mb: -0.5, fontSize: 20 }}
                          />{" "}
                          {product.salary} /yr
                        </Typography>
                        <Typography sx={{ mr: 2 }}>
                          <BusinessCenterIcon sx={{ mb: -0.5, fontSize: 20 }} />{" "}
                          {product.exp} yr
                        </Typography>
                        <Typography sx={{ mr: 2 }}>
                          Skills: {product.skills}
                        </Typography>
                        <Typography>
                          <LocationOnOutlinedIcon
                            sx={{ mb: -0.5, fontSize: 20 }}
                          />{" "}
                          {product.location}
                        </Typography>
                      </Stack>

                      <Button variant="contained" sx={{ mt: 1, ml: 1 }}>
                        Apply Now
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Stack>
          </Grid>
        </Box>
      </Stack >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ ml: "40%", mb: "2%" }}
      // sx={{ mt: 2, justifyContent: 'center' }}
      />
    </Box >
  );
};

export default FilterComponent;
