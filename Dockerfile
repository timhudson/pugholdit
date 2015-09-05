FROM iojs:onbuild
RUN apt-get update
RUN apt-get install graphicsmagick -y
EXPOSE 1515
