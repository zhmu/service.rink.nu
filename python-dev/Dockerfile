FROM debian
RUN  apt-get update && apt-get upgrade -y
RUN  apt-get install --no-install-recommends -y locales python3-psycopg2 postgresql-client python3-mutagen

# make sure en.US.UTF-8 is available
RUN echo 'en_US UTF-8' >> /etc/locale.gen
# from http://jaredmarkell.com/docker-and-locales/; makes it default
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8
