<template>
<div id="github-commits">
	<template v-for="item in commits">
		<div class="box commit">
		<article class="media">
		  <div class="media-left">
		    <figure class="image is-48x48">
		      <a :href="item.author.html_url">
		      <img style="max-height: 100%" :src="item.author.avatar_url" alt="Image" class="rounded">
		      </a>
		    </figure>
		  </div>
		  <div class="media-content">
		    <div class="content commit-message">
		      <p>
		        <strong><a :href="item.html_url">{{ item.commit.message | truncate }}</a></strong>
		        <br>
				<small>Committed by <a :href="item.author.html_url">{{ item.commit.author.name }}</a></small> •
		        <small>{{ item.commit.author.date | formatDate }}</small>
		      </p>
		    </div>
		  </div>
		</article>
		</div>
	</template>
</div>
</template>

<script>
module.exports = {
	name: 'github-commits',
	props: ['repo', 'limit', 'branch'],
	props: {
	  repo: {
	  	type: String,
	  	required: true,
	  },
	  limit: {
	  	type: Number,
	  	required: false,
	  	default: 3,
	  },
	  branch: {
	  	type: String,
	  	required: false,
	  	default: 'master',
	  }
	},

	data: function () {
	  return {
	  	commits: null
	  }
	},

	created: function () {
	  this.fetchData()
	},

	filters: {
	  truncate: function (v) {
	    var newline = v.indexOf('\n')
	    return newline > 0 ? v.slice(0, newline) : v
	  },
	  formatDate: function (v) {
	  	const DATE = v.replace(/T|Z/g, ' ')
	  	if (typeof timeago == 'function') {
		    return timeago().format(DATE)
	  	} else {
	  		return DATE
	  	}
	  }
	},

	methods: {
		apiURL: function () {
			return 'https://api.github.com/repos/' 
				+ this.repo 
				+ '/commits?per_page=' 
				+ this.limit
				+ '&sha='
				+ this.branch;
		},
	  fetchData: function () {
	    var xhr = new XMLHttpRequest()
	    var self = this
	    xhr.open('GET', this.apiURL())
	    xhr.onload = function () {
	      self.commits = JSON.parse(xhr.responseText)
	      console.log(self.commits[0].html_url)
	    }
	    xhr.send()
	  }
	}
}
</script>

<style>
@import 'assets/bulma.min.css'
</style>

<style scoped>
#github-commits {
	margin: 1rem;
}
.box:not(:last-child) {
  margin-bottom: 1rem;
}
.rounded {
  border-radius:5px;
}
.commit-message a {
  color: black;
}
.commit-message a:hover {
  text-decoration: underline;
}
</style>