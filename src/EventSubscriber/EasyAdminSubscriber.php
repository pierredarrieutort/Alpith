<?php

namespace App\EventSubscriber;

use App\Entity\Season;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\EventDispatcher\GenericEvent;
use App\Entity\Serie;


class EasyAdminSubscriber implements EventSubscriberInterface
{

    public static function getSubscribedEvents()
    {
        return array(
            'easy_admin.pre_persist' => array('createFirstSeason'),
        );
    }

    public function createFirstSeason(GenericEvent $event)
    {
        $entity = $event->getSubject();

        if (!($entity instanceof Serie)||!$entity->getSeason()) {
            return;
        }

        $season = new Season();
        $season->setSeason(1);
        $season->setName("1");
        $entity->addSeason($season);

    }
}