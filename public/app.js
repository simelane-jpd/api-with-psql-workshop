document.addEventListener('alpine:init', () => {
    Alpine.data('garment', () => ({
        errorMessage: false,
        successMessage: false,
        garments: '',
        garmentsLength: 0,
        genderFilter: '',
        seasonFilter: '',
        maxPrice: 0.00,
        open: false,
        description: '', 
        price:'', 
        img:'', 
        season:'', 
        gender:'',
        
 
        toggle() {
            this.open = ! this.open
        },
        getData(){
            axios
                .get(`/api/garments`)
                .then(result => {
                    const results = result.data
                    this.garments=results.data
                    this.garmentsLength=results.data.length
                })
            },
        getDataLength(){
            axios
                .get(`/api/garments`)
                .then(result => {
                    const results = result.data
                    this.garmentsLength=results.data.length
                })
            },
        filterGarments(){
            axios
            .get(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
            .then(result => {
                const results = result.data
                this.garments=results.data
                
                this.garmentsLength=results.data.length
            })
        },
        filterGarmentsByPrice(){
            axios
            .get(`/api/garments/price/${this.maxPrice}`)
            .then(result => {
                const results = result.data
                this.garments=results.data
                this.garmentsLength=results.data.length
            })
        },
        addGarment() {
            const fields = {
                description: this.description,
                img: this.img,
                price: this.price,
                gender: this.gender,
                season: this.season,
            };

            if (this.description && this.price && this.img && this.season && this.gender !== '') {
                axios
                    .post('/api/garment', fields)
                    .then(result => {
                        if (result.data.message === 'duplicate') {
                            this.errorMessage = true,
                                this.$refs.errorMessage.innerText = 'garment already exists'
                        } else {
                            this.successMessage = true,
                                this.$refs.successMessage.innerText = 'Garment added successfully'
                        }
                        this.open = false
                        axios
                            .get(`/api/garments`)
                            .then(result => {
                                const results = result.data
                                this.garments = results.data
                            })
                        this.description = '',
                            this.price = '',
                            this.img = '',
                            this.season = '',
                            this.gender = ''
                    })

            }
            else {

                if (!fields === '') {
                    this.successMessage = true,
                        this.$refs.successMessage.innerText = 'Garment added successfully'

                }
                else {
                    if (!this.description) {
                        this.errorMessage = true,
                            this.$refs.errorMessage.innerText = 'Fill in blank field(s)'
                    } else if (!this.price) {
                        this.errorMessage = true,
                          this.$refs.errorMessage.innerText = 'Fill in blank field(s)'
                    } else if (!this.img) {
                        this.errorMessage = true,
                            this.$refs.errorMessage.innerText = 'Fill in blank field(s)'
                    } else if (!this.season) {
                        this.errorMessage = true,
                            this.$refs.errorMessage.innerText = 'Fill in blank field(s)'
                    } else if (!this.gender) {
                        this.errorMessage = true,
                            this.$refs.errorMessage.innerText = 'Fill in blank field(s)'
                    }
                }
            }
            setTimeout(() => { this.successMessage = false }, 2000);
            setTimeout(() => { this.errorMessage = false }, 2000);
        },
        
        deleteGarment(description) {
            axios
                .delete(`/api/garments?description=${description}`)
                .then(result => {

                    axios
                        .get(`/api/garments`)
                        .then(result => {
                            const results = result.data
                            this.garments = results.data
                            this.garmentsLength = results.data.length
                            

                        
                })
                })
            },
        
    }));
})